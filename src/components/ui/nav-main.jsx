import PropTypes from 'prop-types';
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export function NavMain({ items }) {
  const [openIndex, setOpenIndex] = useState(
    () => parseInt(sessionStorage.getItem("openIndex")) || null
  );

  useEffect(() => {
    sessionStorage.setItem("openIndex", openIndex);
  }, [openIndex]);

  const handleLinkClick = (e, index) => {
    e.stopPropagation();
    setOpenIndex(index);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => (
          <div key={item.title}>
            <SidebarMenuItem>
              {item.items ? (
                <Collapsible
                  asChild
                  open={openIndex === index}
                  onOpenChange={(open) => {
                    setOpenIndex(open ? index : null);
                  }}
                  className="group/collapsible"
                >
                  <SidebarMenuItem className="mt-3 text-base">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className="text-base"
                        tooltip={item.title}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              className="text-base mt-2"
                              asChild
                            >
                              <NavLink
                                to={subItem.url}
                                className='w-full'
                                onClick={(e) => handleLinkClick(e, index)}
                              >
                                <span>{subItem.title}</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  className="mt-3 text-base"
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <NavLink to={item.url} className='w-full' onClick={() => setOpenIndex(null)}>
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// PropTypes for the NavMain component
NavMain.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
      icon: PropTypes.elementType,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};
