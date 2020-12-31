import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'

import ActivityStore from "../../../app/stores/activityStore"




const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate, handleSelectActivity, handleDeleteActivity, submitting, target } = activityStore;
    return (

        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as="a">{activity.title} </Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div><b>{activity.description}</b></div>
                                <div><b>{activity.city}, {activity.venue}</b></div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => handleSelectActivity(activity.id)} floated="right" content="View" color="blue" />
                                <Button
                                    name={activity.id}
                                    loading={target === activity.id && submitting}
                                    onClick={(e) => handleDeleteActivity(e, activity.id)}
                                    floated="right" content="Delete" color="red" />
                                <Label basic content={activity.category} />
                            </Item.Extra>

                        </Item.Content>
                    </Item>
                ))}


            </Item.Group>
        </Segment>



    )
}

export default observer(ActivityList);
