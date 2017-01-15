package apps.bigdog.com.multicamera.fragment;

import android.graphics.Color;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.tool.mytool.lib.util.LogUtil;

import org.xutils.view.annotation.ContentView;
import org.xutils.view.annotation.Event;
import org.xutils.view.annotation.ViewInject;

import apps.bigdog.com.multicamera.R;
import apps.bigdog.com.multicamera.view.MySurfaceView;

/**
 * Created by jw362j on 6/2/2016.
 */
@ContentView(R.layout.fragment_home2)
public class HomeTwoFragment extends BaseFragment {
    @ViewInject(R.id.mywebview)
    private WebView mywebview;

    @Override
    protected void initParams() {
        WebSettings webSettings = mywebview.getSettings();

        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);

        mywebview.setBackgroundColor(Color.TRANSPARENT);  //  WebView 背景透明效果
        mywebview.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void OnStop() {

    }

    @Override
    public int myIndex() {
        return 1;
    }

    @Override
    public void DataIn(Object data) {
        if (!isCommunicatable || data == null) {
            return;
        }
        LogUtil.log("HomeTwoFragment is DataIn...");
    }

    @Override
    public void onResume() {
        super.onResume();
        LogUtil.log("HomeTwoFragment is onResume...");
    }

    @Override
    public Object DataOut() {
        return null;
    }
}
