import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Context as AuthContext } from '../../contexts/authContext';
import { Context as CommentContext } from '../../contexts/commentContext';
import CommentBox from './CommentBox';



const CommentSection = (props) => {

    const { productId, userId } = props;
    const { state: stateAuth } = useContext(AuthContext);
    const { state: stateComment, createComment, fetchComments } = useContext(CommentContext);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchComments(productId);
    }, []);

    const renderComment = ({ item }) => <CommentBox item={item} />


    const submitComment = () => {
        if (comment.length === 0) return;

        createComment({
            commentText: comment,
            id: uuidv4(),
            likeCount: 0,
            productId,
            userId: stateAuth.user.id,
            userImageURL: stateAuth.user.userImageURL,
            username: stateAuth.user.username,
            reply: []
        });
        setComment('');
    };


    return (
        <View>
            {stateAuth.user.id === userId || stateAuth.user.role === 'buyer' && (
                <View style={styles.inputContainer}>
                    <Input
                        placeholder='comment ...'
                        onChangeText={text => setComment(text)}
                        value={comment}
                    />
                    <Button title='send' onPress={submitComment} />
                </View>
            )}

            <FlatList
                data={Object.values(stateComment).filter(cmt => cmt.productId === productId)}
                renderItem={renderComment}
                keyExtractor={cmt => cmt.id}
            />
        </View>
    );
};





export default CommentSection;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'row'
    },
});
