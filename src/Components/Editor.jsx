import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "monaco-yaml/lib/esm/monaco.contribution";
import { languages } from "monaco-editor/esm/vs/editor/editor.api";
import { schemaV3, schemaV2, v2Uri, v3Uri } from "./schemas";
import "monaco-editor";
import "./Editor.css";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

window.MonacoEnvironment = {
  getWorkerUrl(moduleId, label) {
    return `./${label === "yaml" ? "yaml" : "editor"}.worker.bundle.js`;
  },
};

const { yaml } = languages || {};

export const Editor = () => {
  window.global = window;
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const [value, setValue] = useState("");
  const [version, setVersion] = useState(2);

  useEffect(() => {
    yaml.yamlDefaults.setDiagnosticsOptions({
      validate: true,
      enableSchemaRequest: true,
      error: true,
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
      <div className="Editor__Container">
        <MonacoEditor
          width="50%"
          language="yaml"
          value={value}
          onChange={setValue}
        />
        <div className="Swagger">
          <SwaggerUI spec={value} />
        </div>
      </div>
    </>
  );
};
