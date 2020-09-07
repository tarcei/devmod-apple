export interface Config {
  token: string
  prefix?: RegExp
  
  channels?: {
    log?: string
    roles?: string
    reports?: string

    help?: string[]
  }

  roles?: {
    muted?: string
    
    pingable?: {
      [key: string]: string
    }

    assignableEmbeds?: {
      [key: string]: unknown

      items: {
        [key: string]: string
      } 
    }[]
  }
}
