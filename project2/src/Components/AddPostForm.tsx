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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Enter title";
    if (!body.trim()) newErrors.body = "Enter content";
    if (title.length > 30) newErrors.title = "Title must be within 30 chars";
    if (body.length > 180) newErrors.body = "Body must be within 180 chars";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newPost = {
      id: Date.now(),
      title,
      body,
      views:0,
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
            error={!!errors.title}
            helperText={errors.title}
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
            error={!!errors.body}
            helperText={errors.body}
            multiline
            minRows={3}
            maxRows={10}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ bgcolor: "black", color: "whitesmoke" }}
          >
            Add Post
          </Button>

          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ bgcolor: "black", color: "whitesmoke" }}
          >
            Cancel
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostForm;
