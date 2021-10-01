import { Component, OnInit } from '@angular/core';

import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {Router} from "@angular/router";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  ruta: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
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
          {name: 'Broccoli', ruta: 'http://localhost:4200/mci/list-persons'},
          {name: 'Brussels sprouts', ruta: ''},
        ]
      }, {
        name: 'Orange',
        ruta: '',
        children: [
          {name: 'Pumpkins', ruta: ''},
          {name: 'Carrots', ruta: ''},
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
}
@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  showFiller = false;

  ngOnInit(): void {
  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router:Router) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  navigate(ruta:string){
    this.router.navigate([ruta]);
  }
}
