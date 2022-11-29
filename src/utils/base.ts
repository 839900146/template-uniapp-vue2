/**
 * 复制内容至剪切板
 * @param content 要复制的内容
 */
export const copy = (content: string, msg?: string) => {
    uni.setClipboardData({
        data: content,
        success: () => {
            uni.getClipboardData({
                success: () => {
                    uni.showToast({
                        title: msg || '复制成功',
                        icon: 'none',
                    })
                },
                fail: (err) => {
                    console.log(err)
                },
            })
        },
        fail: (err) => {
            console.log(err)
        },
    })
}

/**
 * 延迟
 * @param time 毫秒
 */
export const delay = (time: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

/**
 * toast提示框
 */
export const toast = {
    message: (text: string) => {
        uni.showToast({ title: text, icon: 'none' })
    },
    success: (text: string) => {
        uni.showToast({ title: text, icon: 'success' })
    },
    error: (text: string) => {
        uni.showToast({ title: text, icon: 'error' })
    },
}

/**
 * 展示或隐藏loading
 */
export const loading = {
    show: (text?: string) => {
        loading.hide()
        uni.showLoading({ title: text, mask: true })
        return loading.hide
    },
    hide: () => {
        uni.hideLoading()
    },
}

/**
 * 截断字符串并在后面添加省略号
 * @param str 要处理的字符串
 * @param len 最大长度（字符串长度超出该单位则以省略号替代）
 */
export const setTextOver = (str: string, len: number) => {
    if (!str) return ''
    let reg = new RegExp(`(.{${len}})(.+)`)
    return str.replace(reg, '$1...')
}

/**
 * 下载文件
 * @param url 网络地址
 * @returns 临时文件地址
 */
export const downloadFile = async (url: string): Promise<string | false> => {
    return new Promise((resolve, reject) => {
        uni.downloadFile({
            url,
            success: (result) => {
                resolve(result.tempFilePath)
            },
            fail: () => reject(false),
        })
    })
}

/**
 * 保存图片到设备
 * @param type 图片地址类型
 * @param url 图片地址
 */
export const saveImageToDevice = async (type: 'tmep' | 'net', url: string): Promise<boolean> => {
    let temp = url
    console.log(url)
    try {
        loading.show('正在下载')
        if (type === 'net') {
            let tempUrl = await downloadFile(url)
            if (tempUrl) temp = tempUrl
        }
    } catch (error) {
        console.log(error)
        loading.hide()
        toast.message('下载失败')
        return false
    }
    return new Promise((resolve) => {
        loading.hide()
        // #ifdef MP-WEIXIN
        uni.saveImageToPhotosAlbum({
            filePath: temp,
            success: () => {
                toast.message('保存成功')
                resolve(true)
            },
            fail: (error) => {
                if (error.errMsg.includes('fail auth deny')) {
                    uni.showModal({
                        title: '',
                        content: '请在设置中打开“添加相册”权限',
                        confirmText: '设置',
                        success: ({ confirm }) => {
                            confirm &&
                                uni.openSetting({
                                    success(res) {
                                        console.log(res.authSetting)
                                    },
                                })
                        },
                    })
                } else {
                    toast.message('保存失败')
                }
                resolve(false)
            },
        })
        // #endif
        // #ifdef H5
        let a = document.createElement('a')
        a.download = ''
        a.href = temp
        document.body.appendChild(a)
        a.click()
        a.remove()
        // #endif
    })
}