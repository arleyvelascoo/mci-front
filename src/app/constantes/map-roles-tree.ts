import {TreeNode} from "../models/tree-node";
import {TREE_MEMBER} from "./TreeMember";
import {TREE_LEADER} from "./TreeLeader";

export const MAP_ROLES_TREE: Map<string, TreeNode[]> =
  new Map([["Miembro", TREE_MEMBER],
    ["Líder", TREE_LEADER],
    ["Administrador", TREE_MEMBER]]);
