import request from '@/utils/request'
/**
 * 获取数据的接口
 * @param {接口url} url
 * @param {参数} params
 */
export function initData(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
