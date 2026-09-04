import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  badge?: number;
}

@Component({
  selector: "nb-menu",
  templateUrl: "./menu.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule],
  styles: [`
    :host {
      display: block;
      height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 280px;
      background-color: #0f172a;
      color: #cbd5e1;
      border-right: 1px solid #1e293b;
      box-sizing: border-box;
      user-select: none;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 24px;
      border-bottom: 1px solid rgba(30, 41, 59, 0.6);
    }

    .logo {
      width: 36px;
      height: 36px;
      background-color: #6366f1;
      color: white;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
    }

    .logo-text {
      font-size: 1.125rem;
      font-weight: 600;
      color: white;
      letter-spacing: 0.025em;
    }

    .search-container {
      padding: 16px;
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 14px;
      width: 16px;
      height: 16px;
      color: #64748b;
    }

    .search-box input {
      width: 100%;
      padding: 10px 12px 10px 38px;
      background-color: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(51, 65, 85, 0.5);
      border-radius: 10px;
      font-size: 0.875rem;
      color: white;
      outline: none;
      box-sizing: border-box;
      transition: all 0.2s;
    }

    .search-box input::placeholder {
      color: #64748b;
    }

    .search-box input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 1px #6366f1;
    }

    .menu-list {
      flex: 1;
      overflow-y: auto;
      padding: 8px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .no-results {
      text-align: center;
      padding: 32px 0;
      font-size: 0.875rem;
      color: #64748b;
    }

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 12px 16px;
      background: transparent;
      border: none;
      border-radius: 10px;
      font-weight: 500;
      font-size: 0.875rem;
      color: #cbd5e1;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
    }

    .menu-item:hover {
      background-color: rgba(30, 41, 59, 0.6);
      color: white;
    }

    .menu-item:hover .icon {
      color: #818cf8;
    }

    .menu-item.active {
      background-color: #6366f1;
      color: white;
      box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.2);
    }

    .menu-item.active .icon {
      color: white;
    }

    .menu-item-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .icon {
      width: 20px;
      height: 20px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }

    .badge {
      padding: 2px 8px;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 9999px;
      background-color: rgba(99, 102, 241, 0.2);
      color: #a5b4fc;
      border: 1px solid rgba(99, 102, 241, 0.3);
    }

    .sidebar-footer {
      padding: 16px;
      border-top: 1px solid rgba(30, 41, 59, 0.6);
    }

    .user-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px;
      background-color: rgba(30, 41, 59, 0.3);
      border: 1px solid #1e293b;
      border-radius: 10px;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, #a855f7, #6366f1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-email {
      font-size: 0.75rem;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `]
})
export class MenuComponent {
  searchQuery: string = "";
  activeId: string = "dashboard";

  @Output() itemClick = new EventEmitter<MenuItem>();

  menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Дашборд",
      icon:
        '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>',
    },
    {
      id: "projects",
      label: "Проекты",
      icon:
        '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>',
      badge: 4,
    },
    {
      id: "tasks",
      label: "Задачи",
      icon:
        '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',
      badge: 12,
    },
    {
      id: "team",
      label: "Команда",
      icon:
        '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
    },
    {
      id: "analytics",
      label: "Аналитика",
      icon:
        '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
    },
    {
      id: "settings",
      label: "Настройки",
      icon:
        '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
    },
  ];

  get filteredItems(): MenuItem[] {
    if (!this.searchQuery.trim()) {
      return this.menuItems;
    }
    const query = this.searchQuery.toLowerCase();
    return this.menuItems.filter((item) => item.label.toLowerCase().includes(query));
  }

  selectItem(item: MenuItem) {
    this.activeId = item.id;
    this.itemClick.emit(item);
  }
}
