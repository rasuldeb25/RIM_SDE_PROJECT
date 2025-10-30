/* Minimal downloader used by mvnw.cmd to fetch the wrapper jar if missing. */
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;

public class MavenWrapperDownloader {
    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.err.println("Usage: MavenWrapperDownloader <url> <destFile>");
            System.exit(1);
        }
        String url = args[0];
        String dest = args[1];
        try (InputStream in = new URL(url).openStream(); FileOutputStream out = new FileOutputStream(dest)) {
            in.transferTo(out);
        }
    }
}


