import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../global/colors';
import format from 'date-fns/format';

const TaskCard = React.memo(({ task, deleteTask, markTaskAsComplete }) => {
    const {
        id,
        taskName,
        taskDate,
        taskTime,
        taskDescription,
        isCompleted,
    } = task;

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{taskName}</Title>
                <Paragraph>{taskDescription || 'Description not available'}</Paragraph>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Icon name="date-range" size={18} color={colors.text} />
                        <Paragraph style={styles.detailText}>
                            {format(new Date(taskDate), 'dd MMM yy') || 'Date not available'}
                        </Paragraph>
                    </View>
                    <View style={styles.detailItem}>
                        <Icon name="access-time" size={18} color={colors.text} />
                        <Paragraph style={styles.detailText}>
                            {format(new Date(taskTime), 'HH:MM') || 'Time not available'}
                        </Paragraph>
                    </View>
                </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
                <Button icon="delete" onPress={() => deleteTask(id)} labelStyle={{ color: colors.errorText }}>
                    Delete
                </Button>
                {isCompleted ? (
                    <Button icon="check-circle" style={{ backgroundColor: colors.greenLight }}>
                        Done
                    </Button>
                ) : (
                    <Button
                        icon="check-circle-outline"
                        onPress={() => markTaskAsComplete(id)}
                        labelStyle={{ color: colors.primary }}
                        style={{ backgroundColor: colors.secondary }}
                    >
                        Mark Done
                    </Button>
                )}
            </Card.Actions>
        </Card>
    );
});

const styles = StyleSheet.create({
    card: {
        margin: 10,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    detailText: {
        marginLeft: 5,
    },
    cardActions: {
        justifyContent: 'flex-end',
    },
});

export default TaskCard;
