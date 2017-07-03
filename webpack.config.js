module.exports = {
    entry: './out/client/components/candidate/NewCandidate.js',
    output: {
        filename: 'candidate.js',
        path: __dirname + '/public/build/js'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};