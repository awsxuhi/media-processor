module.exports = Object.freeze({
  inputURL: process.env.INPUT_URL || "rtmp://58.200.131.2:1935/livetv/natlgeo",
  basePath: process.env.NODE_ENV === "production" ? "/dev/shm" : "media",
  streamChannel: process.env.CHANNEL_NAME || "natlgeo",

  address: process.env.ADDRESS || "127.0.0.1",
  isMaster: (process.env.IS_MASTER || 'false')=== 'true',

  pathToHLS: (process.env.NODE_ENV === "production" ? "/dev/shm" : "media") + "/index.m3u8",
  channel: process.env.CHANNEL || 'test05',
  isMotion: (process.env.IS_MOTION || 'false')=== 'true',
  isVideo: (process.env.IS_VIDEO || 'true')=== 'true',
  isImage: (process.env.IS_IMAGE|| 'false')=== 'true' ,
  isOnDemand: (process.env.IS_ONDEMAND || 'false')=== 'true',
  isLive: (process.env.IS_HLS || 'false')=== 'true',
  isFLV: (process.env.IS_FLV || 'false')=== 'true',
  isCMAF: (process.env.IS_CMAF || 'false')=== 'true',

  isWatermark: (process.env.IS_WATERMARK || 'false')=== 'true',
  waterMarkText: process.env.WATERMARK_TEXT || '水印',
  waterMarkFontSize: process.env.WATERMARK_FONT_SIZE || '20',
  waterMarkFontColor: process.env.WATERMARK_FONT_COLOR || 'red',
  waterMarkTop: process.env.WATERMARK_FONT_TOP || '10',
  waterMarkLeft: process.env.WATERMARK_FONT_LEFT || '100',

  imageTime: process.env.IMAGE_TIME || "10",
  videoTime: process.env.VIDEO_TIME || "10",
  //
  hlsTime: process.env.HLS_TIME || "2",
  hlsListSize: process.env.HLS_LIST_SIZE || "6",

  ONDEMAND_TIME:process.env.ONDEMAND_TIME || "60",
  ONDEMAND_LIST_SIZE:process.env.ONDEMAND_LIST_SIZE || "2",
//motion
  MOTION_TIMEOUT:process.env. MOTION_TIMEOUT || "60",
  MOTION_DIFF:process.env. MOTION_DIFF || "10",
  MOTION_PERCENT:process.env. MOTION_PERCENT || "30",
  MOTION_DURATION:process.env. MOTION_DURATION || "5",
  //relay
  IS_RELAY: (process.env.IS_RELAY || 'false')=== 'true',
  RELAY_URL: process.env.RELAY_URL || 'rtmp://video-streaming-server-lb-0d6a4ed8ca47d19a.elb.us-east-1.amazonaws.com:1935/stream/114e2be7-9472-4a3c-8baf-c075ea25934a?sign=1670544000-c97645754ab3e5e352fdc0b26cac7f97',
  
  logLevel: process.env.LOG_LEVEL || "info",
  // "quiet" "panic"  "fatal" "error"  , "warning", "info" , "verbose", "debug"  , "trace" 
  transCoding: process.env.TRANSCODING || "copy",
  pixFmt: process.env.PIX_FORMAT || "rgb24",
  buckName:process.env.ASSETS_BUCKET||'video-streaming-assets-assetsbucket-1kf2tlxbhy4qz',
  retryTimeout:30000,

});
