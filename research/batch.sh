#!/bin/bash
run() { py sosearch.py "$1" > "log_$(echo $1 | md5sum | cut -c1-8).txt" 2>/dev/null & }
run "咔哒故事 体验测评 功能"
run "伴鱼绘本 测评 功能 界面"
run "喜马拉雅儿童 测评 功能 家长"
run "宝宝巴士 产品分析 测评"
run "凯叔讲故事 产品分析 功能"
run "少年得到 产品分析 测评"
run "番茄畅听 儿童模式 亲子"
run "微信读书 亲子阅读 儿童"
run "叫叫阅读 测评 阅读计划 打卡"
run "洪恩AI快读 测评 功能"
run "儿童阅读APP 对比 测评 排行"
run "伴鱼绘本 跟读 打分 贝壳"
wait
echo ALL_DONE
ls so_*.json
