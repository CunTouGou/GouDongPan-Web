// 文件模块相关接口
import { get } from './http'

/**
 * 获取首页相关接口
 */
/**
 * 底部信息栏
 */
// 查询系统参数组
export const getParamsDetail = (p) => get('/param/grouplist', p)
