import {TreeNode} from "../models/tree-node";

export const TREE_MEMBER: TreeNode[] = [
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
    name: 'Miembro',
    ruta: '',
    children: [
      {
        name: 'Ver información personal',
        ruta: 'mci/member/personal-information/ver',
        children: []
      }, {
        name: 'Editar información personal',
        ruta: 'mci/member/personal-information/editar',
        children: []
      },
    ]
  },
]
