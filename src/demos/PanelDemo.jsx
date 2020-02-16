import React, { useState } from "react";
import { Panel } from "../components/ui/Panel";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import Icon from "../components/icon";

export const PanelDemo = () => {
  const [panelVisible, setPanelVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setPanelVisible(true)} disabled={panelVisible}>
        Show Panel
      </Button>
      <Panel
        onCloseClick={() => setPanelVisible(false)}
        visible={panelVisible}
        title="Corner Dialog"
        position="right"
      >
        <Label htmlFor="user">Username</Label>
        <Input id="user" icon={<Icon icon="user" />} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed
          molestie orci. Cras auctor ut magna vel sagittis. Nullam cursus
          fermentum dolor, finibus semper felis facilisis mattis. Proin sit amet
          nibh neque. Sed iaculis mauris id enim iaculis, ac gravida leo
          consequat. Proin dignissim magna ut fermentum ullamcorper. In hac
          habitasse platea dictumst. Mauris at tellus dignissim, viverra sapien
          vitae, tempor nisi. Maecenas eu lacus laoreet, sollicitudin massa sed,
          lacinia velit. Suspendisse eget hendrerit augue. Nunc placerat dolor
          urna, nec accumsan diam porttitor sed. Pellentesque vel tristique
          ligula, at posuere elit.
        </p>
        <p>
          Donec vitae mollis justo. Proin fringilla ex urna, quis consectetur
          enim commodo sit amet. In hac habitasse platea dictumst. Nulla vitae
          dolor semper, ornare metus convallis, imperdiet augue. Duis pretium
          urna a lacus pellentesque, sit amet convallis neque tristique. Sed
          posuere nisl quis lorem blandit, in pretium lectus vulputate. Aenean
          sit amet eros varius, convallis nisi condimentum, finibus quam. Duis
          maximus ligula libero, a sodales lectus convallis vel. Nullam
          facilisis augue tellus, sed dapibus augue tincidunt pellentesque.
          Proin aliquam, ante in sollicitudin sollicitudin, purus enim tristique
          ex, non posuere ipsum ante et magna. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
          Pellentesque ut laoreet dolor, suscipit dapibus neque. Proin vulputate
          dui sed iaculis suscipit.
        </p>
      </Panel>
    </>
  );
};
