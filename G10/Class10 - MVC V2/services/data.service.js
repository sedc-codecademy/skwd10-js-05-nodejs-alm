const fs = require("fs")

const writeData = (path,data) => {
	fs.writeFileSync(path,data,(err) => {
		if(err) {
			console.log(err)
		}
	})
}

const readData = path => fs.readFileSync(path, {encoding: "utf-8"})

module.exports = {
	writeDataToDb : writeData,
	readDataFromDb: readData,
}