| Topic                      | Description                                                                              | Link                                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Calling Rust from Frontend | Communicate from frontend to Rust commands                                               | [Calling Rust](https://tauri.app/develop/calling-rust/)                    |
| Global Events              | Emit and listen to global events in Tauri                                                | [Global Events](https://tauri.app/develop/calling-frontend/#global-events) |
| Channels                   | Create custom channels for streaming data                                                | [Channels](https://tauri.app/develop/calling-frontend/#channels)           |
| Core Concepts              | Overview of Tauri architecture and basics                                                | [Core Concepts](https://tauri.app/architecture/)                           |
| Security Best Practices    | Guide on security for Tauri apps                                                         | [Security](https://tauri.app/security/)                                    |
| Frontend Integration       | Using React, Svelte, Vue, etc. with Tauri                                                | [Frontend Frameworks](https://tauri.app/guides/frontend/)                  |
| Plugin System              | Extending Tauri via plugins                                                              | [Plugins](https://tauri.app/plugins/)                                      |
| Configuration              | Customize `tauri.conf.json`                                                              | [Configuration](https://tauri.app/v1/guides/features/configuration/)       |
| Updater                    | Auto-update support in Tauri                                                             | [Updater](https://tauri.app/v1/guides/distribution/updater/)               |
| CLI Commands               | List of Tauri CLI commands                                                               | [CLI](https://tauri.app/v1/guides/usage/cli/)                              |
| Capability                 | A grouping and boundary mechanism developers can use to isolate access to the IPC layer. | [Capability](https://v2.tauri.app/reference/acl/capability/)               |

### 📂 Suggested folder & file structure

```
src-tauri/src/
├── main.rs
├── commands/
│   ├── mod.rs
│   ├── weapons.rs
│   ├── db.rs
│   └── lan.rs
├── models/
│   ├── mod.rs
│   └── weapon.rs
├── utils/
│   ├── mod.rs
│   └── qr.rs
```

### Important links

- [How can I force the window to keep fullscreen?](https://github.com/tauri-apps/tauri/discussions/3313)
- [Does app on Android can be fullscreen without status bar ?](https://github.com/tauri-apps/tauri/discussions/9261)
