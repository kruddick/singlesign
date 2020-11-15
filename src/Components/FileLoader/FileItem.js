import React from "react";

function FileItem(props) {
  return (
    <div className="fileitem" key={props.file.name}>
      <div className="fileitem-item"></div>
      <div className="fileitem-item">{props.file.name}</div>
      <div className="fileitem-item">{formatBytes(props.file.size)}</div>
      <div className="fileitem-item">
        <button onClick={() => props.remove(props.file.name)}>Remove</button>
      </div>
    </div>
  );
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default FileItem;
