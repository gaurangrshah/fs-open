const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = blogs.map((post) => post.likes);
  // if (likes.length === 0) {
  //   likes = [0];
  // }
  return likes.reduce((total, curr) => total + curr, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (acc, curr) => {
    if (curr.likes > acc.likes) {
      return { title: curr.title, author: curr.author, likes: curr.likes };
    }
    return acc;
  };

  return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0]);
};

const getHighestFrequency = (obj = {}) => {
  let highCount = 0;
  let mostFrequent = "";

  Object.entries(obj).forEach(([key, count]) => {
    if (count > highCount) {
      highCount = count;
      mostFrequent = key;
    }
  });
  return { mostFrequent, count: highCount };
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return null;
  // returns the author who has the most blogs and the number of blogs
  const reducer = (acc, blog) => {
    // src: https://tinyurl.com/yhse7xck
    return (acc[blog.author] = (acc[blog.author] || 0) + 1), acc;
  };

  // get each author and the number of blogs they have
  const authorFreqCount = blogs.reduce(reducer, {});


  const { mostFrequent, count } = getHighestFrequency(authorFreqCount);


  return { author: mostFrequent, blogs: count };
};

// returns the author with the most likes
const mostLikes = (blogs) => {
  if (!blogs.length) return null;

  const reducer = (acc, blog) => {
    return !acc[blog.author]
      ? { ...acc, [blog.author]: blog.likes }
      : { ...acc, [blog.author]: acc[blog.author] + blog.likes };
  };

  const likesCount = blogs.reduce(reducer, {});

  const { mostFrequent, count } = getHighestFrequency(likesCount);

  return {author: mostFrequent, likes: count}
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  getHighestFrequency
};
