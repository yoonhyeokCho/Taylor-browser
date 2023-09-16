const scripts = {
    "youtube ad block": `
    if (document.querySelectorAll('.ad-showing').length > 0) {
      const video = document.querySelector('video');
      if (video) {
        video.currentTime = video.duration;
      }
    }
    `
};
export default scripts;