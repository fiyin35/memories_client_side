import React from 'react'
import {useState, useRef} from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import {commentPost} from '../../actions/posts';

const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleComment = async () => {
      const finalComment = `${user.result.name}: ${comment}`;

      const newComment = await dispatch(commentPost(finalComment, post._id));
      setComments(newComment);
      setComment('');

      commentsRef.current.scrollIntoView({ behavior: 'smooth'});
    };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          
          <Typography gutterBottom variant="h6"> Comments </Typography>
          {
            comments.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1"> 
               <strong> { c.split(': ')[0] } </strong>
               { c.split(':')[1] }
              </Typography>
            ))
          }
          <div ref={commentsRef}/>
          </div>
        </div>
        {user?.result?.name && (
        <div style={{ width: '70%'}}> 
          <Typography gutterBottom variant="h6"> Write a Comment </Typography>
          <TextField 
          fullWidth
          rows={4}
          variant="outlined"
          label="Comment"
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          />
          <Button 
          style={{marginTop: '10px'}}
          variant="contained"
          fullWidth
          disabled={!comment.length}
          color="primary"
          onClick={handleComment}
          >Comment </Button>
        </div>
         )}
    </div>
  )
}

export default CommentSection;
