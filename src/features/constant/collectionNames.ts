import { DISTRIBUTOR_STATUS } from './enums/status.enum';

export const collectionNames = {
    USER: 'users',
    CLIENT_USER: 'client_users',
    MERCHANT: 'merchants',
    BRANCH: 'branches',
    ASSOCIATE_BRANCH: 'associated_branches', //for track active branch every time the user login
    RESELLER: 'resellers',
    SUB_RESELLER: 'sub_resellers',
    ADMIN: 'admins',
    SUPER_ADMIN: 'super_admins',
    ADMIN_PERMISSION: 'admin_permissions',
    CLIENT_LIMIT: 'client_limits',
    PACKAGE_MODULE: 'package_modules',
    NOTE: 'notes',
    SUPPORT_NUMBER: 'support_numbers',
    SHUNNO_PACKAGE: 'shunno_packages',
    MERCHANT_PACKAGE: 'merchant_packages',

    //Distributor
    DISTRIBUTOR: 'distributors',

    DOMAIN_INFO: 'domain_info',

    DISTRIBUTOR_SERIAL: 'distributor_serials',
    DISTRIBUTOR_BALANCE_STATEMENT: 'distributor_balance_statements',
    DISTRIBUTOR_AGENT: 'distributor_agents',
    DISTRIBUTOR_AMOUNT: 'distributor_recharge_reports',

    //Sale Agent
    SALE_AGENT: 'sale_agents',
    SALE_AGENT_SERIAL: 'sale_agent_serials',

    //settings
    SETTINGS: 'settings',

    // staffs
    EMPLOYEE: 'employees',
    EMPLOYEE_ROLE: 'employee_roles',
    PERMISSION: 'permissions',
    PAY_HEAD: 'pay_heads',
    SALARY: 'salaries',

    //configuration
    ZONE: 'zones',
    SUB_ZONE: 'sub_zones',
    BOX: 'boxes',
    CLIENT_TYPE: 'client_types',

    CONNECTION_TYPE: 'connection_types',

    RETURN_CLIENT: 'return_clients',
    //router
    ROUTER: 'routers',
    ROUTER_HISTORY: 'router_historys',
    CRON_HISTORY: 'cron_historys',
    PACKAGE: 'packages',
    PACKAGE_ALIAS: 'package_aliases',
    SHARE_PACKAGE: 'share_packages',

    //OLT
    OLT: 'olts',
    OLT_INFO: 'olt_info',

    HOTSPOT_CLIENT: 'hotspots_clients',
    HOTSPOT_USER: 'hotspots_users',
    HOTSPOT_ROUTER: 'hot_spot_routers',

    HOTSPOT_PACKAGE: 'hotspots_packages',
    HOTSPOT_BILL: 'hotspots_bills',

    //inventory
    INVENTORY: 'inventories',
    CATEGORY: 'categories',
    PRODUCT: 'products',
    SUB_CATEGORY: 'subcategories',
    PRODUCT_ITEM: 'product_items',
    BRAND: 'brands',
    MANUFACTURER: 'manufacturers',
    UNIT: 'units',
    SUPPLIER: 'suppliers',
    PURCHASE: 'purchases',
    INVOICE: 'invoices',
    SALE: 'sales',

    //clients
    CLIENT: 'clients',
    BLACK_LIST_CLIENT: 'black_list_clients',
    SERIAL: 'serials',
    MERCHANT_SERIAL: 'merchant_serials',

    CLIENT_RESTORE: 'client_restores',

    //Reseller Report
    AMOUNT: 'recharge_reports',

    //Account
    EXPENDITURE: 'expenditures',
    EXPENDITURE_TYPE: 'expenditure_types',
    INCOME: 'incomes',
    INCOME_TYPE: 'income_types',
    CASHBOX: 'cashboxes',

    //Activity Log
    ACTIVITY_LOG: 'activity_logs',
    ADMIN_ACTIVITY_LOG: 'admin_activity_logs',

    //Bill
    BILL: 'bills',

    // Message
    BILL_CONFIRMATION: 'bill_confirmations',
    ALERT_MESSAGE: 'alert_messages',
    NEW_CLIENT_MESSAGE: 'new_client_messages',
    NEW_RESELLER_MESSAGE: 'new_reseller_messages',
    EXPIRED_CLIENT_MESSAGE: 'expired_client_messages',
    RESELLER_RECHARGE_MESSAGE: 'reseller_recharge_messages',
    SALARY_MESSAGE: 'salary_messages',
    MESSAGE_BALANCE: 'message_balances',
    MESSAGE_INVOICE: 'message_invoices',
    MAP_INVOICE: 'map_invoices',

    MESSAGE_GATEWAY: 'message_gateways',

    SUB_RESELLER_RECHARGE_MESSAGE: 'sub_reseller_recharge_messages',
    ACTIVE_INACTIVE_CLIENT_MESSAGE: 'active_inactive_client_messages',
    // Deposits
    DEPOSIT: 'deposits',

    //Table Visibility
    COLUMN_VISIBILITY: 'column_visibilities',

    //network device
    NETWORK_DEVICE: 'network_devices',
    NETWORK_DEVICE_OUTPUT: 'network_device_outputs',

    //Network Diagram
    NETWORK_DIAGRAM_ITEMS: 'network_diagram_items',
    NETWORK_DIAGRAM: 'network_diagrams',

    MAP_DIAGRAM: 'map_diagrams',

    GOOGLE_MAP_NETWORK_DESIGN: 'google_map_network_designs',
    GOOGLE_MAP_BALANCE: 'google_map_balance',
    GOOGLE_MAP_BALANCE_STATEMENT: 'google_map_balance_statement',

    GOOGLE_MAP_SETTING: 'google_map_settings',

    // Reseller
    RESELLER_PACKAGE: 'reseller_packages',

    //product assign
    ASSIGN_PRODUCTS: 'assign_products',

    // payment gateway
    PAYMENT_GATEWAY: 'payment_gateways',
    ONLINE_PAYMENT: 'online_payments',

    // shunno
    SHUNNO_INVOICE: 'shunno_invoices',

    //client session
    CLIENT_SESSION: 'client_sessions',

    RESELLER_BALANCE_STATEMENT: 'reseller_balance_statement',
    SUB_RESELLER_BALANCE_STATEMENT: 'sub_reseller_balance_statement',

    //Client Portal
    CLIENT_PACKAGE_CHANGE: 'client_package_change',
    CLIENT_BULLETIN: 'clients_bulletin',
    CLIENT_PORTAL_MOVIE_CONTENT: 'clients_portal_movie_contents',
    CLIENT_PORTAL_OFFER_CONTENT: 'clients_portal_offer_contents',
    CLIENT_PORTAL_TERMS_CONDITION_CONTENT: 'clients_portal_terms_contents',
    CLIENT_PORTAL_INSTRUCTION_CONTENT: 'clients_portal_instruction_contents',

    //support
    SUPPORT_EMPLOYEE_ASSIGN: 'support_employee',
    SUPPORT_TYPE: 'support_type',
    SUPPORT_CATEGORY: 'support_category',
    SUPPORT: 'support',
};
