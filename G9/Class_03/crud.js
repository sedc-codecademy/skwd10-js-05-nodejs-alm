const fs = require("fs");
const fsProm = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

async function insertRecord(newRecord) {
  const data = JSON.parse(await readRecords());
  const updatedFileStructure = {
    records: [...data.records, { ...newRecord, id: uuid() }],
  };
  //   fs.writeFileSync(
  //     path.join(__dirname, "database", "records.json"),
  //     JSON.stringify(updatedFileStructure)
  //   );
  fs.writeFile(
    path.join(__dirname, "database", "records.json"),
    JSON.stringify(updatedFileStructure),
    (error) => {
      if (error) {
        console.log("UNABLE TO WRITE IN FILE");
      }
      console.log("DATA WAS WRITTEN SUCCESFULLY");
    }
  );
  console.log("WHATEVER");
  //   fs.writeFileSync(
  //     path.join(__dirname, "database", "backup", "records.json"),
  //     JSON.stringify(updatedFileStructure)
  //   );
}

async function readRecords() {
  //   const data = fs.readFileSync(
  //     path.join(__dirname, "database", "records.json")
  //   );
  //   return data;
  const data = await fsProm.readFile(
    path.join(__dirname, "database", "records.json")
  );

  console.log(data.toString());
  console.log("WHATEVER1");
  return data.toString();
}

async function removeRecord(recordId) {
  const data = JSON.parse(await readRecords());
  const filteredRecords = data.records.filter(
    (record) => record.id !== recordId
  );
  const updatedFileStructure = {
    records: filteredRecords,
  };
  fs.writeFileSync(
    path.join(__dirname, "database", "records.json"),
    JSON.stringify(updatedFileStructure)
  );
}

module.exports = {
  insertRecord,
  readRecords,
  removeRecord,
};
