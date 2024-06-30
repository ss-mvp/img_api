const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);

const handleErrorAsync = function handleErrorAsync(func) {
  return function (req, res, next) {
    func(req, res, next).catch(
      function (error) {
        return next(error);
      }
    );
  };
};

app.get('/', handleErrorAsync(async (req, res, next) =>  {
  res.status(200).json({
    status: true,
    message: "Service is enabled!",
  });
}));

app.use(function(req, res, next) {
  res.status(404).json({
    status: false,
    message: "抱歉，未知的請求",
  });
});

// 程式出現重大錯誤時
process.on('uncaughtException', err => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
  console.error('Uncaught Exception！')
  console.error(err);
  process.exit(1);
});

// 未捕捉到的 catch
process.on('unhandledRejection', (err, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', err);
})
