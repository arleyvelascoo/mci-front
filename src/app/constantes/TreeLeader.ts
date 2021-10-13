import {TreeNode} from "../models/tree-node";

export const TREE_LEADER: TreeNode[] = [
  {
    name: 'MCI',
    ruta: '',
    children: [{
      name: 'Noticias',
      ruta: 'mci',
      children: []
    },]
  },
  {
    name: 'Líder',
    ruta: '',
    children: [
      {
        name: 'Discípulos',
        ruta: 'mci/leader/disciples',
        children: []
      }
    ]
  },
]
