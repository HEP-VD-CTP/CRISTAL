// ../src-electron/electron-main.ts
import { app, BrowserWindow } from "electron";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
var platform = process.platform || os.platform();
var currentDir = fileURLToPath(new URL(".", import.meta.url));
var mainWindow;
async function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.resolve(currentDir, "icons/icon.png"),
    // tray icon
    width: 1e3,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(
        currentDir,
        path.join("/Users/marcel/Desktop/git/CRISTAL/.quasar/dev-electron/preload", "electron-preload.cjs")
      )
    }
  });
  if (true) {
    await mainWindow.loadURL("http://localhost:9300");
  } else {
    await mainWindow.loadFile("index.html");
  }
  if (true) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow?.webContents.closeDevTools();
    });
  }
  mainWindow.on("closed", () => {
    mainWindow = void 0;
  });
}
void app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === void 0) {
    void createWindow();
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjLWVsZWN0cm9uL2VsZWN0cm9uLW1haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGFwcCwgQnJvd3NlcldpbmRvdyB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnXG5cbi8vIG5lZWRlZCBpbiBjYXNlIHByb2Nlc3MgaXMgdW5kZWZpbmVkIHVuZGVyIExpbnV4XG5jb25zdCBwbGF0Zm9ybSA9IHByb2Nlc3MucGxhdGZvcm0gfHwgb3MucGxhdGZvcm0oKTtcblxuY29uc3QgY3VycmVudERpciA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLicsIGltcG9ydC5tZXRhLnVybCkpO1xuXG5sZXQgbWFpbldpbmRvdzogQnJvd3NlcldpbmRvdyB8IHVuZGVmaW5lZDtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlV2luZG93KCkge1xuICAvKipcbiAgICogSW5pdGlhbCB3aW5kb3cgb3B0aW9uc1xuICAgKi9cbiAgbWFpbldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHtcbiAgICBpY29uOiBwYXRoLnJlc29sdmUoY3VycmVudERpciwgJ2ljb25zL2ljb24ucG5nJyksIC8vIHRyYXkgaWNvblxuICAgIHdpZHRoOiAxMDAwLFxuICAgIGhlaWdodDogNjAwLFxuICAgIHVzZUNvbnRlbnRTaXplOiB0cnVlLFxuICAgIHdlYlByZWZlcmVuY2VzOiB7XG4gICAgICBjb250ZXh0SXNvbGF0aW9uOiB0cnVlLFxuICAgICAgLy8gTW9yZSBpbmZvOiBodHRwczovL3YyLnF1YXNhci5kZXYvcXVhc2FyLWNsaS12aXRlL2RldmVsb3BpbmctZWxlY3Ryb24tYXBwcy9lbGVjdHJvbi1wcmVsb2FkLXNjcmlwdFxuICAgICAgcHJlbG9hZDogcGF0aC5yZXNvbHZlKFxuICAgICAgICBjdXJyZW50RGlyLFxuICAgICAgICBwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuUVVBU0FSX0VMRUNUUk9OX1BSRUxPQURfRk9MREVSLCAnZWxlY3Ryb24tcHJlbG9hZCcgKyBwcm9jZXNzLmVudi5RVUFTQVJfRUxFQ1RST05fUFJFTE9BRF9FWFRFTlNJT04pXG4gICAgICApLFxuICAgIH0sXG4gIH0pO1xuXG4gIGlmIChwcm9jZXNzLmVudi5ERVYpIHtcbiAgICBhd2FpdCBtYWluV2luZG93LmxvYWRVUkwocHJvY2Vzcy5lbnYuQVBQX1VSTCk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgbWFpbldpbmRvdy5sb2FkRmlsZSgnaW5kZXguaHRtbCcpO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52LkRFQlVHR0lORykge1xuICAgIC8vIGlmIG9uIERFViBvciBQcm9kdWN0aW9uIHdpdGggZGVidWcgZW5hYmxlZFxuICAgIG1haW5XaW5kb3cud2ViQ29udGVudHMub3BlbkRldlRvb2xzKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gd2UncmUgb24gcHJvZHVjdGlvbjsgbm8gYWNjZXNzIHRvIGRldnRvb2xzIHBsc1xuICAgIG1haW5XaW5kb3cud2ViQ29udGVudHMub24oJ2RldnRvb2xzLW9wZW5lZCcsICgpID0+IHtcbiAgICAgIG1haW5XaW5kb3c/LndlYkNvbnRlbnRzLmNsb3NlRGV2VG9vbHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1haW5XaW5kb3cub24oJ2Nsb3NlZCcsICgpID0+IHtcbiAgICBtYWluV2luZG93ID0gdW5kZWZpbmVkO1xuICB9KTtcbn1cblxudm9pZCBhcHAud2hlblJlYWR5KCkudGhlbihjcmVhdGVXaW5kb3cpO1xuXG5hcHAub24oJ3dpbmRvdy1hbGwtY2xvc2VkJywgKCkgPT4ge1xuICBpZiAocGxhdGZvcm0gIT09ICdkYXJ3aW4nKSB7XG4gICAgYXBwLnF1aXQoKTtcbiAgfVxufSk7XG5cbmFwcC5vbignYWN0aXZhdGUnLCAoKSA9PiB7XG4gIGlmIChtYWluV2luZG93ID09PSB1bmRlZmluZWQpIHtcbiAgICB2b2lkIGNyZWF0ZVdpbmRvdygpO1xuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLEtBQUsscUJBQXFCO0FBQ25DLE9BQU8sVUFBVTtBQUNqQixPQUFPLFFBQVE7QUFDZixTQUFTLHFCQUFxQjtBQUc5QixJQUFNLFdBQVcsUUFBUSxZQUFZLEdBQUcsU0FBUztBQUVqRCxJQUFNLGFBQWEsY0FBYyxJQUFJLElBQUksS0FBSyxZQUFZLEdBQUcsQ0FBQztBQUU5RCxJQUFJO0FBRUosZUFBZSxlQUFlO0FBSTVCLGVBQWEsSUFBSSxjQUFjO0FBQUEsSUFDN0IsTUFBTSxLQUFLLFFBQVEsWUFBWSxnQkFBZ0I7QUFBQTtBQUFBLElBQy9DLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxJQUNSLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFnQjtBQUFBLE1BQ2Qsa0JBQWtCO0FBQUE7QUFBQSxNQUVsQixTQUFTLEtBQUs7QUFBQSxRQUNaO0FBQUEsUUFDQSxLQUFLLEtBQUssa0VBQTRDLHNCQUFrRTtBQUFBLE1BQzFIO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUksTUFBaUI7QUFDbkIsVUFBTSxXQUFXLFFBQVEsdUJBQW1CO0FBQUEsRUFDOUMsT0FBTztBQUNMLFVBQU0sV0FBVyxTQUFTLFlBQVk7QUFBQSxFQUN4QztBQUVBLE1BQUksTUFBdUI7QUFFekIsZUFBVyxZQUFZLGFBQWE7QUFBQSxFQUN0QyxPQUFPO0FBRUwsZUFBVyxZQUFZLEdBQUcsbUJBQW1CLE1BQU07QUFDakQsa0JBQVksWUFBWSxjQUFjO0FBQUEsSUFDeEMsQ0FBQztBQUFBLEVBQ0g7QUFFQSxhQUFXLEdBQUcsVUFBVSxNQUFNO0FBQzVCLGlCQUFhO0FBQUEsRUFDZixDQUFDO0FBQ0g7QUFFQSxLQUFLLElBQUksVUFBVSxFQUFFLEtBQUssWUFBWTtBQUV0QyxJQUFJLEdBQUcscUJBQXFCLE1BQU07QUFDaEMsTUFBSSxhQUFhLFVBQVU7QUFDekIsUUFBSSxLQUFLO0FBQUEsRUFDWDtBQUNGLENBQUM7QUFFRCxJQUFJLEdBQUcsWUFBWSxNQUFNO0FBQ3ZCLE1BQUksZUFBZSxRQUFXO0FBQzVCLFNBQUssYUFBYTtBQUFBLEVBQ3BCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
