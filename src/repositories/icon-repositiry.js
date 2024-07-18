const { storage } = require("../libs/firebase");
const { ref, listAll, getDownloadURL } = require("firebase/storage");

const listAllIcons = async (folder) => {
  const listRef = ref(storage, folder);
  const response = await listAll(listRef);
  const { items } = response;
  const uri = await Promise.all(items.map((item) => getDownloadURL(item)));
  const data = await Promise.all(
    items.map((item, index) => {
      return { name: item.name, uri: uri[index] };
    })
  );
  return data;
};

module.exports = { listAllIcons };
