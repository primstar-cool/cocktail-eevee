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
            pageBaseFuncName = pageBaseImportNode.children[0].children[0].tsNode.escapedText;
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

                    pageBaseCallNode = v.children.find(vv => vv.type === "CallExpression" && (vv?.children?.["0"]?.tsNode?.escapedText) === pageBaseFuncName);
                    

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
            v => v.type === "PropertyAssignment" && v.children && v.children.find(vv => vv.type === 'Identifier' && vv.tsNode.escapedText === 'data')
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
                        // debugger
                        if (v2.type === 'PropertySignature') {
                            ASSERT(v2.children[0].type === 'Identifier')
                            ASSERT(v2.children[1].type === 'TypeLiteral' || v2.children[1].type === 'TypeReference'
                                || v2.children[1].type === "NumberKeyword" || v2.children[1].type === "StringKeyword" || v2.children[1].type === "ArrayType"
                            )
                            
                            let propertyName = v2.children[0].tsNode.escapedText;
                            let codeNode = objectLiteralNode.children.find(v3 => 
                                (v3.type === 'PropertyAssignment' 
                                && v3.children?.[0]?.type === "Identifier" 
                                && v3.children[0].tsNode.escapedText === propertyName)
                            );
                            // debugger
                            
                            result[0].childNodes.push(
                                {
                                    "tagName": "identifier",
                                    "id": propertyName,
                                    "scope": "@CONTEXT__",
                                    "kind": "let",
                                    "type": v2.children[1].text.trim(),
                                    "code": `this.pageContent.data.${propertyName}`,// codeNode ? codeNode.text.trim().replace(new RegExp(propertyName+"[\\s]*:"), `${propertyName} =`) : undefined,
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

        let methodDeclarationNode = pageObjectNode.children.filter(
            v => v.type === "MethodDeclaration"
        );

        methodDeclarationNode.forEach(
            v => {
                let identifierNode = v.children.find(vv => vv.type === 'Identifier')
                let identifier = identifierNode.tsNode.escapedText;
                
                if ([
                    "onLoad", "onUnload", "onShow"
                ].includes(identifier)) return;
                
                // debugger
                let params = v.children.filter(vv => vv.type === 'Parameter');

                let ret = v.children.filter(vv => vv.type !== 'Parameter' && vv.type !== 'Identifier' && vv.type !== 'Block')

                ASSERT(ret.length <= 1);
                if (ret.length === 0) {
                    ret.push({text: "unknown"});
                }

                let paramsStringWithType = `${params.map(v=>v.text.trim()).join(", ")}`;

                // let indent = "  ";

                result[0].childNodes.push(
                    {
                        "tagName": "method",
                        "id": identifier,
                        "scope": "@CONTEXT__",
                        "kind": "const",
                        "type": `(${paramsStringWithType}) => ${ret[0].text.trim()}`,
                        "code": `(${paramsStringWithType}): ${ret[0].text.trim()} {\n  return this.pageContent.${identifier}(${params.length ? params.map(v=>v.children[0].tsNode.escapedText).join(", ")  : ''});\n}`,// codeNode ? codeNode.text.trim().replace(new RegExp(propertyName+"[\\s]*:"), `${propertyName} =`) : undefined,
                        "comment": `define in page`,

                    }
                );

                    debugger
            }
        );
        

        debugger

        // debugger
        let onLoadExpressNode = methodDeclarationNode.find(
            v => v.children && v.children.find(vv => vv.type === 'Identifier'  && vv.tsNode.escapedText === 'onLoad')
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
                                    return n.type ===  'MethodDeclaration' && (n.children?.[0]?.tsNode?.escapedText) === "getPrivateData"
                                }
                            )[0];

                            if (getPrivateDataNode) {
                                // debugger

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
                                // debugger

                                if (retTypeNode?.type === "TypeLiteral") {

                                    retTypeNode.children.forEach(
                                        v2 => {
                                            if (v2.type === 'PropertySignature') {
                                                ASSERT(v2.children[0].type === 'Identifier')
                                                ASSERT(v2.children[1].type === 'TypeLiteral' || v2.children[1].type === 'TypeReference'
                                                    || v2.children[1].type === "NumberKeyword" || v2.children[1].type === "StringKeyword" || v2.children[1].type === "ArrayType"
                                                )
                                                
                                                let propertyName = v2.children[0].tsNode.escapedText;

                                                // if (propertyName === 'aaaa') debugger

                                                let codeNode = objectLiteralNode.children.find(v3 => 
                                                    (v3.type === 'PropertyAssignment' 
                                                    && v3.children?.[0]?.type === "Identifier" 
                                                    && v3.children[0].tsNode.escapedText === propertyName)
                                                );
                                                // debugger
                                                
                                                result[0].childNodes.push(
                                                    {
                                                        "tagName": "identifier",
                                                        "id": propertyName,
                                                        "scope": "@CONTEXT__",
                                                        "kind": "let",
                                                        "type": v2.children[1].text.trim(),
                                                        "code": `this.pageContent.data.${propertyName}!`,//codeNode ? codeNode.text.trim().replace(new RegExp(propertyName+"[\\s]*:"), `${propertyName} =`) : undefined,
                                                        "comment": `define mixed ${v.substr(v.lastIndexOf("/") + 1)}`,
                                                        "question": true,
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

                                // debugger

                            }


                            let getPrivateFunctionNode = _findCondiTsNodeRequire(mixedAstNode,
                                (n) => {
                                    return n.type ===  'MethodDeclaration' && (n.children?.[0]?.tsNode?.escapedText) === "getPrivateFunction"
                                }
                            )[0];

                            if (getPrivateFunctionNode) {
                                debugger
                                let retTypeNode = getPrivateFunctionNode.children.find(vv => vv.type !== 'Parameter' && vv.type !== 'Identifier' && vv.type !== 'Block')

                                ASSERT (retTypeNode.type === "TypeReference");

                                ASSERT (retTypeNode.children[0].tsNode.escapedText === "Record");

                                let typeNode = (retTypeNode.children[1]);
                                let funcType = (retTypeNode.children[2]).text.trim().replace(/undefined[\s]*\|[\s]*/g, "").replace(/\|[\s]*undefined[\s]*/g, "").trim();

                                ASSERT (typeNode.type === "LiteralType" || typeNode.type === "UnionType");

                                let typeNameNodeArr = (typeNode.type === "UnionType") ? typeNode.children : [typeNode];

                                let typeNameArr = typeNameNodeArr.map(
                                    v => {
                                        ASSERT(v.type === "LiteralType")
                                        return v.tsNode.literal.text
                                    }
                                )

                                // debugger


                                result[0].childNodes.push(
                                    ...typeNameArr.map(
                                        name => ({
                                            "tagName": "method",
                                            "id": name,
                                            "scope": "@CONTEXT__",
                                            "kind": "const",
                                            "type": `${funcType}`,
                                            "code": `(e?: CktlV3.PageEvent): void {\n  if (this.pageContent.${name})\n    return this.pageContent.${name}(e);\n}`,// codeNode ? codeNode.text.trim().replace(new RegExp(propertyName+"[\\s]*:"), `${propertyName} =`) : undefined,
                                            "comment": `define mixed ${v.substr(v.lastIndexOf("/") + 1)}`,
                                            "question": true,
                                        })
                                    )
                                    
                                );

                                // debugger

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

    if (node.type === "CallExpression" && (node.children?.[0]?.tsNode?.escapedText) === 'require') {
        arr.push(node);
    }

    if (node.children) {
        node.children.forEach(
            subN => _loopRequire(subN, arr)
        )
    }


    return arr;
}