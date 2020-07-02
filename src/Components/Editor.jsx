import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "monaco-yaml/esm/monaco.contribution";
import { languages } from "monaco-editor/esm/vs/editor/editor.api";
import { schemaV3, schemaV2, v2Uri, v3Uri } from "./schemas";
import "monaco-editor";

window.MonacoEnvironment = {
  getWorkerUrl(moduleId, label) {
    if (label === "yaml") {
      return "/static/js/yaml.worker.chunk.js";
    }
    return "/static/js/editor.worker.chunk.js";
  },
};

const { yaml } = languages || {};

export const Editor = () => {
  const [value, setValue] = useState("");
  const [version, setVersion] = useState(2);

  useEffect(() => {
    yaml.yamlDefaults.setDiagnosticsOptions({
      validate: true,
      enableSchemaRequest: true,
      hover: true,
      completion: true,
      schemas: [
        {
          uri: version === 3 ? v3Uri : v2Uri,
          fileMatch: ["*"],
          schema: version === 3 ? schemaV3 : schemaV2,
        },
      ],
    });
  }, [version]);

  return (
    <>
      <div>
        <label htmlFor="rbt_v3">V3</label>
        <input
          type="radio"
          id="rbt_v3"
          name="version"
          checked={version === 3}
          onChange={(event) => setVersion(3)}
        />
        <label htmlFor="rbt_v2">V2</label>
        <input
          type="radio"
          id="rbt_v2"
          name="version"
          checked={version === 2}
          onChange={(event) => setVersion(2)}
        />
      </div>
      <button>Save</button>

      <MonacoEditor
        height="600"
        language="yaml"
        value={value}
        onChange={setValue}
      />
    </>
  );
};
