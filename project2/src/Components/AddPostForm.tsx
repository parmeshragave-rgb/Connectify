import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

const AddPostForm = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;

    const newPost = {
      id: Date.now(),
      title,
      body,
      reactions: { likes: 0, dislikes: 0 },
    };

    onSubmit(newPost);

    setTitle("");
    setBody("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            
            placeholder="Enter title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
          
            placeholder="Post Body"

            fullWidth
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <Button variant="contained" onClick={handleSubmit} sx={{bgcolor:"black",color:"whitesmoke"}}>
            Add Post
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostForm;