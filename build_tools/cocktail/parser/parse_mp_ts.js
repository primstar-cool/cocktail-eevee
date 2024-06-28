const path = require("path");
const fs = require("fs");

const ts = require("typescript"); 


function ASSERT (flag, ...args) {
    if (!flag) {
        debugger
        throw new Error(...args);
    }
}

module.exports = function (
    content,filePath
) {


    const result = [
        {
            "tagName": "context",
            "childNodes": [
              
            ]
        }
            
    ]

    const tsAstNode = require("../../eevee/eevee/parser/parse_tsx.js")(content, filePath, ts.ScriptTarget.Latest);
    let pageBaseFuncName;
    
    let pageBaseImportNode = tsAstNode.children.find(
        v => {

            // debugger
            if (v.type === "ImportDeclaration") {
                let pageBaseNode = v.children.find(vv => vv.type === "StringLiteral" && vv.text.replace(/\\/g, "/").includes("/cocktail/@union/framework/page_base"));
    
                if (pageBaseNode) return true;
            }
    
            return false;
            
        }
    );

    // debugger
    ASSERT(pageBaseImportNode && pageBaseImportNode.children && pageBaseImportNode.children[0].type === 'ImportClause', "can't find page_base import");

    if (pageBaseImportNode && pageBaseImportNode.children && pageBaseImportNode.children[0].type === 'ImportClause') {
        if (pageBaseImportNode.children[0].children[0].type === 'Identifier') {
            pageBaseFuncName = pageBaseImportNode.children[0].children[0].text.trim();
        } else {
            ASSERT(false, "can't find page_base name")
        }
    } else return;
    // debugger

    let pageObjectNode;
    if (pageBaseFuncName) {
        let pageBaseCallNode;

        let pageBaseExpNode = tsAstNode.children.find(
            v => {
    
                // debugger
                if (v.type === "ExpressionStatement") {

                    pageBaseCallNode = v.children.find(vv => vv.type === "CallExpression" && (vv?.children?.["0"]?.text||'').trim() === pageBaseFuncName);
                    

                    if (pageBaseCallNode) return true;
                }
        
                return false;
                
            }
        );

        if (pageBaseExpNode && pageBaseCallNode) {

            pageObjectNode = pageBaseCallNode.children.find(
                v => v.type === "ObjectLiteralExpression"
            )

        }
        else {
            ASSERT(false, "can't find PageBase call")

        }

    } else return;



    if (pageObjectNode && pageObjectNode.children) {
        let dataExpressNode = pageObjectNode.children.find(
            v => v.type === "PropertyAssignment" && v.children && v.children.find(vv => vv.type === 'Identifier' && vv.text.trim() === 'data')
        );
        // debugger
        if (dataExpressNode) {
            let asExpressionNode = dataExpressNode.children.find( v => v.type === "AsExpression");

            if (asExpressionNode) {
                let objectLiteralNode = asExpressionNode.children[0];
                let typeLiteralNode = asExpressionNode.children[1];

                ASSERT (objectLiteralNode.type === 'ObjectLiteralExpression')
                ASSERT (typeLiteralNode.type === 'TypeLiteral')
                
                typeLiteralNode.children.forEach(
                    v2 => {
                        if (v2.type === 'PropertySignature') {
                            ASSERT(v2.children[0].type === 'Identifier')
                            ASSERT(v2.children[1].type === 'TypeLiteral' || v2.children[1].type === 'TypeReference'
                                || v2.children[1].type === "NumberKeyword" || v2.children[1].type === "StringKeyword" || v2.children[1].type === "ArrayType"
                            )
                            
                            let propertyName = v2.children[0].text.trim()
                            let codeNode = objectLiteralNode.children.find(v3 => 
                                (v3.type === 'PropertyAssignment' 
                                && v3.children?.[0]?.type === "Identifier" 
                                && v3.children[0].text.trim() === propertyName)
                            );
                            // debugger
                            
                            result[0].childNodes.push(
                                {
                                    "tagName": "identifier",
                                    "id": propertyName,
                                    "scope": "@CONTEXT__",
                                    "kind": "let",
                                    "type": v2.children[1].text.trim(),
                                    "code": codeNode ? codeNode.text.trim().replace(new RegExp(propertyName+"[\\s]*:"), `${propertyName} =`) : undefined,
                                    "comment": `define in page.data`,

                                }
                            );

                            // debugger
                        } else {
                            
                            
                        }
                    }
                )
                

                // debugger
            } else {
                console.warn("no data as Expression");
            }

        } else {
            console.warn("no default data in page define object");
        }

        debugger
        let onLoadExpressNode = pageObjectNode.children.find(
            v => v.type === "MethodDeclaration" && v.children && v.children.find(vv => vv.type === 'Identifier'  && vv.text.trim() === 'onLoad')
        );
        if (onLoadExpressNode) {
            let requireMixed = _loopRequire(onLoadExpressNode);

            if (requireMixed?.length) {
               let requireMixedPath = requireMixed.map(v=> (v.children[1]?.text||'')).filter( v => v.includes("/mixed/")).map( v => path.join(path.dirname(filePath), eval(v)));
               debugger

               requireMixedPath.forEach(
                    v => {
                        if (fs.existsSync(v + '.ts')) {

                            let rmp = fs.readFileSync(v + '.ts', 'utf8');

                            const mixedAstNode = require("../../eevee/eevee/parser/parse_tsx.js")(rmp, v + '.ts', ts.ScriptTarget.Latest);
                            
                            let getPrivateDataNode = _findCondiTsNodeRequire(mixedAstNode,
                                (n) => {
                                    return n.type ===  'MethodDeclaration' && (n.children?.[0]?.text||'').trim() === "getPrivateData"
                                }
                            )[0];

                            if (getPrivateDataNode) {
                                debugger

                                let retTypeNode = getPrivateDataNode.children.find(
                                    v => (v.type === "TypeLiteral" || v.type === "TypeReference")
                                );

                                let returnNode = _findCondiTsNodeRequire(getPrivateDataNode,
                                    (n) => {
                                        return n.type ===  'ReturnStatement'
                                    }
                                );

                                ASSERT(returnNode.length === 1);
                                returnNode = returnNode[0];
                                
                                let objectLiteralNode = returnNode?.children?.[0];
                                debugger

                                if (retTypeNode?.type === "TypeLiteral") {

                                    retTypeNode.children.forEach(
                                        v2 => {
                                            if (v2.type === 'PropertySignature') {
                                                ASSERT(v2.children[0].type === 'Identifier')
                                                ASSERT(v2.children[1].type === 'TypeLiteral' || v2.children[1].type === 'TypeReference'
                                                    || v2.children[1].type === "NumberKeyword" || v2.children[1].type === "StringKeyword" || v2.children[1].type === "ArrayType"
                                                )
                                                
                                                let propertyName = v2.children[0].text.trim()
                                                let codeNode = objectLiteralNode.children.find(v3 => 
                                                    (v3.type === 'PropertyAssignment' 
                                                    && v3.children?.[0]?.type === "Identifier" 
                                                    && v3.children[0].text.trim() === propertyName)
                                                );
                                                // debugger
                                                
                                                result[0].childNodes.push(
                                                    {
                                                        "tagName": "identifier",
                                                        "id": propertyName,
                                                        "scope": "@CONTEXT__",
                                                        "kind": "let",
                                                        "type": v2.children[1].text.trim(),
                                                        "code": codeNode ? codeNode.text.trim().replace(new RegExp(propertyName+"[\\s]*:"), `${propertyName} =`) : undefined,
                                                        "comment": `define mixed ${v.substr(v.lastIndexOf("/") + 1)}`,
                                                    }
                                                );
                    
                                                // debugger
                                            } else {
                                                
                                                
                                            }
                                        }
                                    )

                                } else {
                                    ASSERT(false, 'not support yet')
                                }

                                debugger

                            }

                        } else {
                            ASSERT(false);
                        }
                }
               )
               


            }
            debugger
        }
        debugger

    } else {
        ASSERT(false, "can't find PageBase object")
    }

    return result;
}

function _findCondiTsNodeRequire(node, condi, arr) {
    if (!arr) arr = [];

    if (condi(node)) {
        arr.push(node);
    }

    if (node.children) {
        node.children.forEach(
            subN => _findCondiTsNodeRequire(subN, condi, arr)
        )
    }


    return arr;
}

function _loopRequire(node, arr) {
    if (!arr) arr = [];

    if (node.type === "CallExpression" && (node.children?.[0]?.text || '').trim() === 'require') {
        arr.push(node);
    }

    if (node.children) {
        node.children.forEach(
            subN => _loopRequire(subN, arr)
        )
    }


    return arr;
}