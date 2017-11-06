package com.example.jabbe.adtest;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import com.kaltura.playersdk.KPPlayerConfig;
import com.kaltura.playersdk.PlayerViewController;

public class MainActivity extends AppCompatActivity {

    private PlayerViewController mPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        initializePlayer();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);

        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    private PlayerViewController initializePlayer() {
        if (mPlayer == null) {
            mPlayer = (PlayerViewController) findViewById(R.id.player);
            mPlayer.loadPlayerIntoActivity(this);

            KPPlayerConfig config = new  KPPlayerConfig("http://cdnapi.kaltura.com", "40901491", "1897241");

            config.addConfig("autoPlay", "true");
            config.addConfig("doubleClick.contentId", "{mediaProxy.entry.id}");

            config.setEntryId("0_hs4cwtub");

            mPlayer.initWithConfiguration(config);
        }

        return mPlayer;
    }
}