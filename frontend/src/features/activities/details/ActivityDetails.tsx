import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Card, Image } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';






const ActivityDetails: React.FC = () => {
    const { selectedActivity, openEditForm, cancelSelectedActivity } = useContext(ActivityStore)

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{selectedActivity!.title}</Card.Header>
                <Card.Meta>
                    <span>{selectedActivity!.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity!.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => { openEditForm(selectedActivity!.id) }} basic color="blue" content="Edit" />
                    <Button onClick={() => { cancelSelectedActivity() }} basic color="grey" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetails);
