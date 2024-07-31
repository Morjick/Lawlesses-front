const upload = async (file: File): Promise<string> => {
  try {
    const formdata = new FormData()

    formdata.append('file', file)

    const data = await fetching(`/upload-image`, {
      method: 'POST',
      body: formdata
    })

    if (data.status !== 200) {
      throw new Error(data.body.error || data.body.message)
    }

    return data.body.path
  } catch (e) {
    return ''
  }
}

export const uploadFiles = async (files: File | File[]): Promise<string | string[]> => {
  if (Array.isArray(files)) {
    const paths: string[] = []
    
    for (let i = 0; i < files.length; i++) {
      const path = await upload(files[i])

      paths.push(path)
    }

    return paths
  } else {
    if (!files) return ''

    const path = await upload(files)

    return path
  }
}
