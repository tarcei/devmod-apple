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
    
    assignable?: {
      [key: string]: string
    }
  }
}
