export interface products {
    color_varient: string
    related: Related[]
    sku: string
    stocks: number
    width: string
    length: string
    fastening: string
    description: string
    imageUrl: string[]
    productname: string
    featured: boolean
    date: Date
    sub_category: string
    category: string
    min_price: number
  }
  
  export interface Related {
    firestore: Firestore
    _delegate: Delegate2
    _userDataWriter: UserDataWriter
  }
  
  export interface Firestore {
    _delegate: Delegate
    _persistenceProvider: PersistenceProvider
    INTERNAL: Internal
    _appCompat: AppCompat
  }
  
  export interface Delegate {
    app: App
    databaseId: DatabaseId
    settings: Settings
  }
  
  export interface App {
    _isDeleted: boolean
    _options: Options
    _config: Config
    _name: string
    _automaticDataCollectionEnabled: boolean
    _container: Container
  }
  
  export interface Options {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
  }
  
  export interface Config {
    name: string
    automaticDataCollectionEnabled: boolean
  }
  
  export interface Container {
    name: string
    providers: Providers
  }
  
  export interface Providers {}
  
  export interface DatabaseId {
    projectId: string
    database: string
  }
  
  export interface Settings {
    host: string
    ssl: boolean
    ignoreUndefinedProperties: boolean
    cacheSizeBytes: number
    experimentalForceLongPolling: boolean
    experimentalAutoDetectLongPolling: boolean
    experimentalLongPollingOptions: ExperimentalLongPollingOptions
    useFetchStreams: boolean
  }
  
  export interface ExperimentalLongPollingOptions {}
  
  export interface PersistenceProvider {}
  
  export interface Internal {}
  
  export interface AppCompat {
    name: string
    automaticDataCollectionEnabled: boolean
    options: Options2
  }
  
  export interface Options2 {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
  }
  
  export interface Delegate2 {
    converter: any
    _key: Key
    type: string
    firestore: Firestore2
  }
  
  export interface Key {
    path: Path
  }
  
  export interface Path {
    segments: string[]
    offset: number
    len: number
  }
  
  export interface Firestore2 {
    app: App2
    databaseId: DatabaseId2
    settings: Settings2
  }
  
  export interface App2 {
    _isDeleted: boolean
    _options: Options3
    _config: Config2
    _name: string
    _automaticDataCollectionEnabled: boolean
    _container: Container2
  }
  
  export interface Options3 {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
  }
  
  export interface Config2 {
    name: string
    automaticDataCollectionEnabled: boolean
  }
  
  export interface Container2 {
    name: string
    providers: Providers2
  }
  
  export interface Providers2 {}
  
  export interface DatabaseId2 {
    projectId: string
    database: string
  }
  
  export interface Settings2 {
    host: string
    ssl: boolean
    ignoreUndefinedProperties: boolean
    cacheSizeBytes: number
    experimentalForceLongPolling: boolean
    experimentalAutoDetectLongPolling: boolean
    experimentalLongPollingOptions: ExperimentalLongPollingOptions2
    useFetchStreams: boolean
  }
  
  export interface ExperimentalLongPollingOptions2 {}
  
  export interface UserDataWriter {
    firestore: Firestore3
  }
  
  export interface Firestore3 {
    _delegate: Delegate3
    _persistenceProvider: PersistenceProvider2
    INTERNAL: Internal2
    _appCompat: AppCompat2
  }
  
  export interface Delegate3 {
    app: App3
    databaseId: DatabaseId3
    settings: Settings3
  }
  
  export interface App3 {
    _isDeleted: boolean
    _options: Options4
    _config: Config3
    _name: string
    _automaticDataCollectionEnabled: boolean
    _container: Container3
  }
  
  export interface Options4 {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
  }
  
  export interface Config3 {
    name: string
    automaticDataCollectionEnabled: boolean
  }
  
  export interface Container3 {
    name: string
    providers: Providers3
  }
  
  export interface Providers3 {}
  
  export interface DatabaseId3 {
    projectId: string
    database: string
  }
  
  export interface Settings3 {
    host: string
    ssl: boolean
    ignoreUndefinedProperties: boolean
    cacheSizeBytes: number
    experimentalForceLongPolling: boolean
    experimentalAutoDetectLongPolling: boolean
    experimentalLongPollingOptions: ExperimentalLongPollingOptions3
    useFetchStreams: boolean
  }
  
  export interface ExperimentalLongPollingOptions3 {}
  
  export interface PersistenceProvider2 {}
  
  export interface Internal2 {}
  
  export interface AppCompat2 {
    name: string
    automaticDataCollectionEnabled: boolean
    options: Options5
  }
  
  export interface Options5 {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
  }
  
  export interface Date {
    seconds: number
    nanoseconds: number
  }
  