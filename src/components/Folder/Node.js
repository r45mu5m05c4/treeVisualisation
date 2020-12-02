import { last } from 'lodash';
import React from 'react';
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';

const getPaddingLeft = (level, type) => {
    //calculates indentation depending on file/folder tier(level)
    let paddingLeft = level * 30;
    if (type === 'file') paddingLeft += 30;
    return paddingLeft;
}

const StyledNode = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 3px;
padding-left: ${props => getPaddingLeft(props.level, props.type)}px;

&:hover {
    background: #6bb541;
    color: #fff;
}`;
StyledNode.displayName = 'StyledNode';

const StyledIcon = styled.div`
padding: 3px;
margin-right: ${props => props.marginRight ? props.marginRight : 5}px;
`;
StyledIcon.displayName = 'StyledIcon';

const Node = (props) => {
    const { node, getSubFolders, level, toggleFolder } = props;


    const getNodeLabel = (node) => last(node.path?.split('/'));



    return (
        <React.Fragment>
            <div style={{width: '30rem'}}>
            <StyledNode level={level} type={node.type}>
                <StyledIcon onClick={() => toggleFolder(node)}>
                    {node.type === 'folder' && (node.showContent ? <FaChevronDown /> : <FaChevronRight />)}
                </StyledIcon>

                <StyledIcon>
                    {node.type === 'file' && <FaFile />}
                    {node.type === 'folder' && node.showContent === true && <FaFolderOpen />}
                    {node.type === 'folder' && !node.showContent && <FaFolder />}
                </StyledIcon>
                <span role="button">
                    {getNodeLabel(node)}
                </span>
            </StyledNode>
            {node.showContent && getSubFolders(node).map(child => (
                <Node
                    {...props}
                    node={child}
                    level={child.level}
                />
            ))}
</div>
        </React.Fragment>
    );
}

export default Node;