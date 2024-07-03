function extractObjectLiterals(s, interfaceName) {
    let startIdx = s.indexOf("{") + 1;
    let endIdx = s.lastIndexOf("}");
    let objectLiterals = s.slice(startIdx, endIdx).trim();
    
    let interfaceDef = `interface ${interfaceName} {\n`;
    let fields = objectLiterals.split(",");
    for (let field of fields) {
        let [fieldName, fieldType] = field.split(":").map(item => item.trim());
        if (fieldType.startsWith("{")) {
            let nestedType = fieldType.replace("{", `${interfaceName}_${fieldName}_`);
            interfaceDef += `  ${fieldName}: ${nestedType};\n`;
        } else {
            interfaceDef += `  ${fieldName}: ${fieldType};\n`;
        }
    }
    interfaceDef += "}\n\n";

    let nestedInterfaceDefs = "";
    for (let field of fields) {
        let [fieldName, fieldType] = field.split(":").map(item => item.trim());
        if (fieldType.startsWith("{")) {
            let nestedType = fieldType.replace("{", `${interfaceName}_${fieldName}_`);
            nestedInterfaceDefs += extractObjectLiterals(fieldType, `${interfaceName}_${fieldName}`);
        }
    }

    return interfaceDef + nestedInterfaceDefs;
}

// 测试
let s = "let a : { abc: number, bar: string, cue: interfaceA, dddd: {f: number, eee: {g: string}}}";
let result = extractObjectLiterals(s, "GeneratedTypeLiteralInterface_1");
console.log(result);