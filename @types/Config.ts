export interface Config {
  token: string
  prefix?: RegExp
  
  channels?: {
    log?: string
    roles?: string
    reports?: string
  }

  roles?: {
    muted?: string
    
    assignableEmbeds?: {
      [key: string]: unknown

      items: {
        [key: string]: string
      } 
    }[]
  }
}
