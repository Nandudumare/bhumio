const useTraverse = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: String(Date.now()),
        details: item,
        isFolder: true,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    console.log(tree);
    latestNode = tree.items.map((elem) => {
      return insertNode(elem, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  return { insertNode };
};

export default useTraverse;
