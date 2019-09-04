let data = [
    { id: 11, parentId: 13, name: "用户管理", children: [] },
    { id: 12, parentId: 13, name: "角色管理", children: [] },
    { id: 11, parentId: 13, name: "用户管理", children: [] },
    { id: 13, parentId: 0, name: "权限管理", children: [] },
    { id: 14, parentId: 0, name: "系统管理", children: [] },
    { id: 15, parentId: 14, name: "日志管理", children: [] },
    { id: 16, parentId: 12, name: "消息管理", children: [] },
]
let newTree = [{ id: 0, children: [] }]
// let data_cope_0 = []
// data.map((item) => {
//     if (item.parentId === 0) {
//         newTree.push(item)
//     } else {
//         data_cope_0.push(item)
//     }
// })

// console.log("newTree", newTree)
// console.log("data_cope_0", data_cope_0)

function findChildren(newTree, data_cope_0) {
    newTree.map((node) => {
        for (let i = 0; i < data_cope_0.length; i++) {
            if (data_cope_0[i].parentId === node.id) {
                node.children.push(data_cope_0[i])
                data_cope_0.splice(i, 1)
                i--
            } else {
                findChildren(node.children, data_cope_0)
            }
        }
    })
}
// findChildren(newTree, data_cope_0)
findChildren(newTree, data) //一步入天象

console.log("newTree", JSON.stringify(newTree))
// console.log("data_cope_0", data_cope_0)

console.log("一步出天象", newTree[0]);

