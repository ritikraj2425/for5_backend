const videos = {
    VideoId: String,
    section: String,
    link: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration : String,
    title : String
}
module.exports = videos;