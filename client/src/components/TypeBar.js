import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";

import ListGroup from "react-bootstrap/ListGroup";
import {Context} from "../index";

const TypeBar = observer(() => {
    const {article} = useContext(Context)
    return (
        <ListGroup>
            {article.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === article.selectedType.id}
                    onClick={() => article.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;