import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {Router} from "@angular/router";
import {TreeNode} from "../models/tree-node";
import {LoginService} from "../services/login/login.service";

let TREE_DATA: TreeNode[] = [
  {
    name: 'Discípulos',
    ruta: '',
    children: [
      {name: 'Apple', ruta: 'helloworld'},
      {name: 'Banana', ruta: 'example'},
      {name: 'Fruit loops', ruta: 'example2'},
    ]
  }, {
    name: 'Asignación de líderes',
    ruta: '',
    children: [
      {
        name: 'Green',
        ruta: '',
        children: [
          {name: 'Broccoli2', ruta: 'http://localhost:4200/mci/list-persons'},
          {name: 'Listar personas', ruta: 'mci/list-persons'},
        ]
      }, {
        name: 'Orange',
        ruta: '',
        children: [
          {name: 'Pumpkins', ruta: ''},
          {name: 'Listar ciudades', ruta: 'mci/list-cities'},
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  ruta: string;
}
@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  ngOnInit(): void {
    TREE_DATA = this.loginService.getAuthorizedRoutesMenu();
    this.dataSource.data = TREE_DATA;
  }

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      ruta: node.ruta,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable,
      node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router:Router, private loginService: LoginService) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  logout(){
    localStorage.setItem('token', '');
    this.router.navigate(['login']).then(r=>{
      console.log(r);
    })
  }
}
