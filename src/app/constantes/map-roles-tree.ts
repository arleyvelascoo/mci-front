import {TreeNode} from "../models/tree-node";
import {TREE_MEMBER} from "./TreeMember";

export const MAP_ROLES_TREE: Map<string, TreeNode[]> =
  new Map([["Miembro", TREE_MEMBER],
    ["Líder", TREE_MEMBER],
    ["Administrador", TREE_MEMBER]]);
