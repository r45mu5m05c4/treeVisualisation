import React, { Component } from 'react';
import Node from '../Folder/Node';
import { files } from './../../Data/Data';
import values from 'lodash/values';

export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: {}
        }
    }
    componentDidMount() {
        let fileList = [...files]
        this.folderGenerator(fileList)
    }
    toggleFolder = (node) => {
        const { nodes } = this.state;
        nodes[node.path].showContent = !node.showContent;
        this.setState({ nodes });
    }
    addNode(depth, file) {
        //converts the string of each node to an object, assigning the necessary props
        let node = {}
        let splitNode = file.split('/', depth)
        let appendNode = splitNode.join('/')
        node.type = appendNode.includes('.') ? 'file' : 'folder';
        node.path = `dir/${appendNode}`;
        node.level = depth;
        if (node.type === 'folder') {
            node.children = [];
        }
        return node;
    }
    folderGenerator(fileList) {
        //converts the list of strings 'files' from data to objects
        let nodeList = {};
        //dir is the 'root' directory
        let dir = { path: 'dir', topLayer: true, type: 'folder' }
        fileList.forEach(file => {
            let splitPath = file.split('/');
            for (let i = 0; i < splitPath.length; i++) {
                let node = this.addNode(i + 1, file)
                nodeList = {
                    ...nodeList,
                    [node.path]: node
                }
            }
        })
        nodeList = {
            ...nodeList,
            dir: dir
        }
        this.addFolderToDirectory(nodeList);
        this.setState({ nodes: nodeList });
    }
    addFolderToDirectory(nodes) {
        ////////////adding children for mapping, starting with root directory 'dir'////////////////////
        nodes.dir.children = [];
        let fileArray = [];
        Object.keys(nodes).map(key => {
            fileArray.push(key);
        })
        fileArray.forEach((file) => {
            let splitPath = file.split('/');
            if (splitPath.length === 2) {
                let addFolder = true;
                nodes.dir.children.forEach((item) => {
                    if (item === file.path) {
                        addFolder = false;
                    }
                })
                addFolder && nodes.dir.children.push(file);
            }
            ///adding children for mapping based on depth in file-system
            else if (splitPath.length === 3) {
                this.addToParentFolder(nodes, file, 3)
            }
            else if (splitPath.length === 4) {
                this.addToParentFolder(nodes, file, 4)
            }
        })
    }
    
    addToParentFolder(nodes, file, length) {
        //uses the path name to find which folder to put the folder/file in
        let slice = length - 1;
        let folder = file.split('/', slice).join('/')
        Object.keys(nodes).forEach(folderNode => {
            //then loops through existing folders and adds to children
            let motherFolder = nodes[folderNode].path
            if (folder === motherFolder) {
                nodes[folderNode].children.push(file);
            }
        })
    }
    findTopNode = () => {
        //finds the 'root' directory
        const { nodes } = this.state;
        return values(nodes).filter(node => node.topLayer === true);
    }
    getSubFolders = (node) => {
        //returns children(subfolders) of given node
        const { nodes } = this.state;
        if (!node.children) return [];
        return node.children.map(path => nodes[path]);
    }
    render() {

        const topLayerNode = this.findTopNode();
        return (
            <div>
                {topLayerNode.map(node => (
                    <Node
                        node={node}
                        getSubFolders={this.getSubFolders}
                        toggleFolder={this.toggleFolder}
                    />
                ))}
            </div>
        )
    }
}

