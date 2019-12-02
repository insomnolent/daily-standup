const path = require('path')
const fs = require('fs')
const _ = require('lodash')

let config
let neverMergeRegexp

exports.loadConfig = () => {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/config.json')))
  config.repos.sort()

  if (_.isString(config.mergeRule.neverRegexp)) {
    neverMergeRegexp = new RegExp(config.mergeRule.neverRegexp, 'i')
  }
};

exports.updateConfig = updatedConfig => {
  config.title = updatedConfig.title
  config.repos = updatedConfig.repos
  config.comments = updatedConfig.comments
  config.mergeRule = updatedConfig.mergeRule
  config.staleHours = updatedConfig.staleHours
  neverMergeRegexp = new RegExp(updatedConfig.mergeRule.neverRegexp, 'i')
  config.repos.sort()

  fs.writeFileSync(path.join(__dirname, '../config/config.json'), JSON.stringify(config))
};

exports.getConfig = () => config

exports.hasMergeRules = () => {
  return config.mergeRule &&
    _.isNumber(config.mergeRule.positive) &&
    _.isNumber(config.mergeRule.negative) &&
    _.isString(config.mergeRule.neverRegexp) &&
    _.isNumber(config.mergeRule.staleHours)
};

exports.getNeverMergeRegexp = () => neverMergeRegexp
