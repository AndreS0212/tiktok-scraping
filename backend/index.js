const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const e = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const getData = async (url) => {
  const result = await axios.get(url);
  if (result.status !== 200) {
    console.error("Error ocurred while fetching data");
    return;
  }
  const $ = cheerio.load(result.data);
  const tiktok = {
    username: url.split("/")[3],
  };
  const followers = $("strong").filter((index, element) => {
    return $(element).attr("data-e2e") == "followers-count";
  });
  const likes = $("strong").filter((index, element) => {
    return $(element).attr("data-e2e") == "likes-count";
  });
  const description = $("h2").filter((index, element) => {
    return $(element).attr("data-e2e") == "user-bio";
  });
  tiktok.followers = followers.text();
  tiktok.likes = likes.text();
  tiktok.description = description.text();
  tiktok.profileUrl = url;
  gallery = {
    videos: [],
    profileUrl: url,
  };
  $("img").each((index, element) => {
    if (index == 0) {
      if (
        $(element)
          .attr("src")
          .includes("expires")
      )
        tiktok.profileImg = $(element).attr("src");
      else {
        console.log($("img")[index].attribs.src);
        tiktok.profileImg = $("img")[index + 1].attribs.src;
      }
    } else if (
      gallery.videos.length < 3 &&
      $(element)
        .attr("src")
        .includes("expires")
    ) {
      gallery.videos.push({
        thumbnail: $(element).attr("src"),
        description: $(element).attr("alt"),
      });
    }
  });
  $("strong.video-count").each((index, element) => {
    if (index < 3) gallery.videos[index].count = $(element).text();
  });
  let descriptions = [];
  $("div").each((index, element) => {
    if ($(element).attr("data-e2e") == "user-post-item-desc") {
      descriptions.push($(element).attr("aria-label"));
    }
  });
  gallery.videos.forEach((element, index) => {
    element.description = descriptions[index];
  });

  return {
    type: "user",
    userData: tiktok,
    gallery,
  };
};

const getEmbed = async (url) => {
  const result = await axios.get(`https://www.tiktok.com/oembed?url=${url}`);
  let videoData = {
    videoUrl: result.data.video_url,
    thumbnail: result.data.thumbnail_url,
    description: result.data.title,
    html: result.data.html,
    title: result.data.title,
  };
  return {
    type: "video",
    videoData,
  };
};

app.post("/tiktok", async (req, res) => {
  let { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });
  let data = {};
  try {
    if (url.includes("/video/")) {
      data = await getEmbed(url);
    } else {
      if (url.includes("?lang=")) url = url.split("?lang=")[0];
      data = await getData(url);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: "Invalid URL" });
  }
  if (!data.userData.followers) res.status(400).json({ error: "Invalid URL" });
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
