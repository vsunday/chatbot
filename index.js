exports.insurance = (req, res) => {
  var msg = "すみません、わかりません";
  var params = req.body.result.parameters;
  var action = req.body.result.action;

  msg = actionFuncMap[action](params);

  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ "speech": msg, "displayText": msg}));
};

function demo2demo2amount(params) {
  var msg = '';
  var number = params.number;
  if (number <= 1100000) {
    msg = "贈与額が110万円以下の場合は課税対象になりません。";
  } else {
    msg = "贈与額が110万円を超える場合は課税対象です。";
  }
  return msg;
}

function demo3(params) {
  var task = "";
  var requiredTasks = ["提案書の出力", "初回の提案であること", "提案活動結果の入力"];

  requiredTasks.forEach((element) => {
    if ((params.requiredTasks).indexOf(element) == -1) task += "・" + element + "¥r¥n";
  });

  var msg = "ポイント反映には¥r¥n" + task + "が必要です。";
  return msg;
}

var actionFuncMap = {
  "demo2.demo2-amount": demo2demo2amount,
  "demo3": demo3
};
