import PostModel from '../models/postModel';

export const getAllPost = async (req, res, next) => {
  try {
    const result = await PostModel.find();

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const result = await PostModel.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export const createPost = async (req, res, next) => {
  try {
    const result = await PostModel.create({
      title: req.body.title,
      body: req.body.body,
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const result = await PostModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
    }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: 'post was deleted',
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
